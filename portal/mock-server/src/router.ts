import { Router } from 'express';
import { Request, Response, Router as CoreRouter } from 'express-serve-static-core';

const router: CoreRouter = Router();


router.post('/qujata-api/analyze', async (req: Request, res: Response) => {
  console.log(`-${req.method} ${req.url}`);
  const data = { test_suite_id: '1' };

  setTimeout(() => {
    res.json(data);
  }, 1500);
});

router.get('/qujata-api/algorithms', async (req: Request, res: Response) => {
  console.log(`-${req.method} ${req.url}`);
  const data = (await import('./algorithms.json')).default;
  setTimeout(() => {
    res.json(data);
  }, 1500);
});

router.get('/qujata-api/iterations', async (req: Request, res: Response) => {
  console.log(`-${req.method} ${req.url}`);
  const data = (await import('./iterations.json')).default;
  setTimeout(() => {
    res.json(data);
  }, 1500);
});

router.get('/qujata-api/test_suites/:testSuiteId', async (req: Request, res: Response) => {
  console.log(`-${req.method} ${req.url}`);
  const data = (await import('./test.json')).default;
  setTimeout(() => {
    res.json(data);
  }, 1500);
});

router.put('/qujata-api/test_suites/:testSuiteId', async (req: Request, res: Response) => {
  console.log(`-${req.method} ${req.url}`);
  setTimeout(() => {
    res.status(200).send();
  }, 1500);
});

router.delete('/qujata-api/test_suites/:testSuiteId', async (req: Request, res: Response) => {
  console.log(`-${req.method} ${req.url}`);
  setTimeout(() => {
    res.status(200).send();
  }, 1500);
});

export default router;
