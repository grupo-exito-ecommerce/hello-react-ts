import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api';
import { ApiConfigInput, IApiResponse, ResolverError } from '../shared';

export class CategoryMenuDataSource extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options);
  }

  resolveFileName(endName: String): String {
    const fileName = `${this.context.account}${endName}`;
    return fileName;
  }

  async getCategoryMenu(config: ApiConfigInput): Promise<IApiResponse> {
    try {
      const { awsS3Endpoint, jsonName, awsLambdaUrl, awsGetCategoryEndpoint } = config;

      const fileUrl = `${awsS3Endpoint}/${this.resolveFileName(jsonName)}`;
      const requestUrl = `${awsLambdaUrl}${awsGetCategoryEndpoint}`;
      const data = {
        url: fileUrl
      };
      const response: IApiResponse = await this.http.post(requestUrl, data, {
        headers: {
          'X-Vtex-Use-Https': true
        }
      });

      return response;
    } catch (err) {
      throw new ResolverError({
        error: err,
        message: 'An error occurred obtaining the information.'
      });
    }
  }
}
