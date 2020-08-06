import { Apps, ExternalClient, InstanceOptions, IOContext } from '@vtex/api';
import { IApiResponse, ResolverError } from '../shared';

export class CategoryMenuDataSource extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options);
  }

  resolveFileName(endName: String): String {
    const fileName = `${this.context.account}${endName}`;
    return fileName;
  }

  async getCategoryMenu(): Promise<IApiResponse> {
    try {
      const apps: Apps = new Apps(this.context);
      const appId: string = process.env.VTEX_APP_ID || '';
      console.log(appId);
      const settings: any = await apps.getAppSettings(appId);
      const { awsS3Endpoint, jsonName, awsLambdaUrl, awsGetCategoryEndpoint } = settings['manageMenu'];

      const fileUrl = `${awsS3Endpoint}/${this.resolveFileName(jsonName)}`;
      console.log(fileUrl);
      const requestUrl = `${awsLambdaUrl}${awsGetCategoryEndpoint}`;
      const data = {
        url: fileUrl
      };
      const response: IApiResponse = await this.http.post(requestUrl, data, {
        headers: {
          'X-Vtex-Use-Https': true
        }
      });
      console.log(response);
      
      return response;
    } catch (err) {
      throw new ResolverError({
        error: err,
        message: 'An error occurred obtaining the information.'
      });
    }
  }
}
