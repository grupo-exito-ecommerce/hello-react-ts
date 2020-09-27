export interface S3Params {
  key: string;
  contentType: string;
  bucket: string;
  ACL?: string;
  expires?: number;
}

export interface ICategory {
  id: number;
  name: string;
  href: string;
  slug?: string;
  icon?: string;
  parent?: number;
  styles?: string;
  showIconLeft?: boolean;
  showIconRight?: boolean;
  categoryId?: string;
  enable?: boolean;
}
export interface ICategories {
  categories: ICategory[];
}
export interface IApiResponse {
  status: number;
  message: string;
  fileName: string | null;
  data: ICategories | null;
}
export interface ICategoryParameter {
  bucket: string;
  key: string;
  categories: ICategory[];
}
export interface ICategoryMenuDataSource {
  getMegaMenu(): ICategory[];
  updateMegaMenu(categories: ICategory[]): string;
}

export interface ApiConfigInput {
  awsLambdaUrl: string;
  awsGetCategoryEndpoint: string;
  awsS3Endpoint: string;
  jsonName: string;
}
