import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    product: 'Lord Metadata API',
    type: 'Metadata monetization platform',
    status: 'active',
    platforms: ['facebook', 'instagram', 'pinterest'],
    modules: ['social-metadata', 'analytics', 'market-packaging'],
    pricing: {
      free: 'limited access',
      pro: '$29/month',
      enterprise: 'custom'
    }
  });
});

export const metaRouter = router;
