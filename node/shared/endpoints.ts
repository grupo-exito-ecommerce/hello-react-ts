interface Endpoints {
  addAttachments: (params: { account: string; orderForm: string; position: number }) => string;
  getAttachments: (params: { account: string; orderForm: string }) => string;
}

interface ListEndpoints {
  qa: Partial<Endpoints>;
  prod: Partial<Endpoints>;
}

const common: Partial<Endpoints> = {
  addAttachments: (params) => {
    return `http://${params.account}.myvtex.com/api/checkout/pub/orderForm/${params.orderForm}/items/${params.position}/attachments/prices`;
  },
  getAttachments: (params) => {
    return `http://${params.account}.myvtex.com/api/checkout/pub/orderForm/${params.orderForm}`;
  }
};

const endpoints: ListEndpoints = {
  qa: {
    ...common
  },
  prod: {
    ...common
  }
};

export const endpoint = (workspace: string) => {
  const urls = workspace === 'master' ? endpoints.prod : endpoints.qa;
  return urls as Endpoints;
};
