import React, { FC } from 'react';
import CategoryMenu from '.';

export interface Props {
  awsLambdaUrl: string;
  awsGetCategoryEndpoint: string;
  awsS3Endpoint: string;
  jsonName: string;
}

const CategoryMenuWrapper: FC<Props> = props => {
  const { awsGetCategoryEndpoint, awsLambdaUrl, awsS3Endpoint, jsonName } = props;
  if (!awsGetCategoryEndpoint || !awsLambdaUrl || !awsS3Endpoint || !jsonName) {
    return null;
  }
  return <CategoryMenu {...props} />;
};

export default CategoryMenuWrapper;
