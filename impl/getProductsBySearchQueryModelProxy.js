'use strict';

module.exports.setup = function(server, proxy) {

  /**
   * @swagger
   * /v1/accounts/:accountId/products/:
   *   post:
   *   description: Proxy endpoint for querying products by search model
   *   produces:
   *    - application/json
   *   parameters:
   *    - name: query
   *      description: query string
   *      required: true
   *      type: string
   *   
   *    - name: pageNumber
   *      description: number of page to fetch
   *      required: true
   *      type: number
   *   
   *    - name: pageSize
   *      description: number of products per page
   *      required: true
   *      type: number
   *   
   *    - name: facetFilters
   *      description: facets
   *      required: true
   *      type: array
   *   
   *    - name: categories
   *      description: product categories
   *      required: true
   *      type: array
   *   
   *   
   *   responses:
   *       200: OK
   *   
   */
  server.post('/v1/accounts/:accountId/products/', (req, res, next) => {
    proxy.web(req, res);
    return next();
  });

}
