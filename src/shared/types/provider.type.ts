import { Provider } from '@nestjs/common';

export type ProvidersType = {
  repositoryProviders: Provider[];
  serviceProviders: Provider[];
  useCaseProviders: Provider[];
  register(): Provider[];
  exports(): string[];
};
