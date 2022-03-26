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
  productList : getBaseUrl(APIService.public) + '/api/products/list',
  createProduct : getBaseUrl(APIService.public) + '/api/products/list',
  userList : getBaseUrl(APIService.public) + '/apiAdmin/users/list',
  country : getBaseUrl(APIService.public) + '/apiAdmin/commons/country',
  state :  getBaseUrl(APIService.public) + '/apiAdmin/commons/state',
  categoryList : getBaseUrl(APIService.public) + '/api/categories/list',
  brandList : getBaseUrl(APIService.public) + '/apiAdmin/brands/list',
  vendorList : getBaseUrl(APIService.public) + '/apiAdmin/vendors/list',
  conditionList : getBaseUrl(APIService.public) + '/apiAdmin/conditions/list',
  shippingList : getBaseUrl(APIService.public) + '/apiAdmin/shipping/list',
  roleList : getBaseUrl(APIService.public) + '/apiAdmin/commons/role',
  productEdit : getBaseUrl(APIService.public) + '/apiAdmin/products/edit',
  userEdit : getBaseUrl(APIService.public) + '/apiAdmin/users/edit',
  userCreate : getBaseUrl(APIService.public) + '/apiAdmin/users/create',
  userDetail : getBaseUrl(APIService.public) + '/apiVendor/profile/detail',
  productCreate : getBaseUrl(APIService.public) + '/apiAdmin/products/create',
  productDetail : getBaseUrl(APIService.public) + '/apiAdmin/products/detail',
  UploadImage : getBaseUrl(APIService.public) + '/api/products/upload-image'
};
