// Types de base
export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Types d'authentification
export type AuthUser = {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export type AuthSession = {
  user: AuthUser;
  expires: Date;
};

// Types d'API
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Types de composants
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive';
export type ComponentSize = 'sm' | 'md' | 'lg';

// Types de formulaires
export type FormState = {
  isSubmitting: boolean;
  errors: Record<string, string[]>;
  success?: boolean;
};
