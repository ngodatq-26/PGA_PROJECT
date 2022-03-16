import { APIHost } from '../utils/constants';

enum APIService {
  authentication,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.authentication) {
    return `${APIHost}/authentication`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `https://api.gearfocus.div4.pgtest.co/api/authentication/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  productList : getBaseUrl(APIService.public) + '/api/products/list',
  createProduct : getBaseUrl(APIService.public) + '/api/products/list',
  userList : getBaseUrl(APIService.public) + '/apiAdmin/users/list',
  country : getBaseUrl(APIService.public) + '/apiAdmin/commons/country',
  state :  getBaseUrl(APIService.public) + '/apiAdmin/commons/state'
};
