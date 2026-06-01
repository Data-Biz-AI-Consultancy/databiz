import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// Import app and pool directly from the server
import { app, pool } from '../../src/backend/server.js';

// Create a mock query function
const mockQuery = vi.fn();

// Overwrite the pool's query method directly with our mock
pool.query = mockQuery;

describe('Backend Server API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/history', () => {
    it('should return 400 if visitor_id is missing', async () => {
      const res = await request(app).get('/api/history');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('visitor_id query parameter is required');
    });

    it('should return visitor memory and history if visitor_id is provided', async () => {
      // Mock db queries
      mockQuery.mockResolvedValueOnce({
        rows: [{ name: 'Mario', persona: 'founder', business: 'Pizza', problems: 'No customers' }]
      });
      mockQuery.mockResolvedValueOnce({
        rows: [
          { role: 'assistant', content: 'Welcome!' },
          { role: 'user', content: 'Hi' }
        ]
      });

      const res = await request(app).get('/api/history?visitor_id=visitor_123');
      expect(res.status).toBe(200);
      expect(res.body.lead).toEqual({
        name: 'Mario',
        persona: 'founder',
        business: 'Pizza',
        problems: 'No customers'
      });
      expect(res.body.messages).toHaveLength(2);
      expect(res.body.messages[0].content).toBe('Welcome!');

      expect(mockQuery).toHaveBeenCalledTimes(2);
    });

    it('should return 500 on database failure', async () => {
      mockQuery.mockRejectedValueOnce(new Error('DB failure'));

      const res = await request(app).get('/api/history?visitor_id=visitor_123');
      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Database error fetching visitor history');
    });
  });

  describe('POST /api/interactions', () => {
    it('should return 400 if required parameters are missing', async () => {
      const res = await request(app)
        .post('/api/interactions')
        .send({ visitor_id: 'visitor_123' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('visitor_id, role, and content are required');
    });

    it('should save interaction and return 201', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/interactions')
        .send({ visitor_id: 'visitor_123', role: 'user', content: 'hello' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO interactions'),
        ['visitor_123', 'user', 'hello']
      );
    });
  });

  describe('POST /api/leads', () => {
    it('should return 400 if visitor_id is missing', async () => {
      const res = await request(app)
        .post('/api/leads')
        .send({ name: 'Mario' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('visitor_id is required');
    });

    it('should upsert lead and return 200', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/leads')
        .send({
          visitor_id: 'visitor_123',
          name: 'Mario',
          persona: 'founder',
          business: 'Noodle Shop',
          problems: 'scale issues'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO leads'),
        ['visitor_123', 'Mario', 'founder', 'Noodle Shop', 'scale issues']
      );
    });
  });
});
