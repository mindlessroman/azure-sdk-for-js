let nock = require('nock');

module.exports.hash = "13d9a3c857c80a36db17192132b4b961";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/series/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-08-27T00:00:00.000Z","series":[{"dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},{"dimension":{"Dim1":"Common Beech","Dim2":"Ant"}}]})
  .reply(200, {"value":[{"series":{"dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},"timestampList":["2020-08-02T00:00:00Z","2020-08-03T00:00:00Z","2020-08-04T00:00:00Z","2020-08-05T00:00:00Z","2020-08-06T00:00:00Z","2020-08-07T00:00:00Z","2020-08-08T00:00:00Z","2020-08-09T00:00:00Z","2020-08-10T00:00:00Z","2020-08-11T00:00:00Z","2020-08-12T00:00:00Z","2020-08-13T00:00:00Z","2020-08-14T00:00:00Z","2020-08-15T00:00:00Z","2020-08-16T00:00:00Z","2020-08-17T00:00:00Z","2020-08-18T00:00:00Z","2020-08-19T00:00:00Z","2020-08-20T00:00:00Z","2020-08-21T00:00:00Z","2020-08-22T00:00:00Z","2020-08-23T00:00:00Z","2020-08-24T00:00:00Z","2020-08-25T00:00:00Z","2020-08-26T00:00:00Z","2020-08-27T00:00:00Z"],"valueList":[65228025.6,91014776.2,90310456.60000001,87431304.60000001,87496303.60000001,83816061,62879751.800000004,66604705.6,94002010.80000001,95839211.80000001,94846211,94562182,86126589.60000001,64214518,67878168.2,96083532.60000001,94633707,94071623.4,93128229.60000001,84883541.60000001,63144893.2,67962266.8,99247723.2,99688542.4,97914675.2,93018427],"isAnomalyList":[null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false,false,false,false,false,false,false,false,false,false,false],"periodList":[null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,7,7,7,7,7,7,7,7,7],"expectedValueList":[null,null,null,null,null,null,null,null,null,null,null,null,83866752.1700526,83049912.98885255,83938021.67818943,86125066.26161471,88555566.81563565,94391387.62676737,92942463.7304138,85463494.25547478,64135164.1676655,68857839.80790395,97522682.2755295,97295554.64898902,96414357.3801183,94814050.73434258],"lowerBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,62611830.95885346,61794991.7776534,62683100.466990285,63925780.18358292,66356280.73760386,72426768.57323217,71103693.70011772,63637775.61304402,42309445.525234744,47032121.16547319,75683912.24523343,75344650.67656827,74463453.40769756,72975280.7040465],"upperBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,105121673.38125175,104304834.2000517,105192942.88938856,108324352.3396465,110754852.89366744,116356006.68030256,114781233.76070987,107289212.89790553,85960882.81009625,90683558.4503347,119361452.30582558,119246458.62140977,118365261.35253903,116652820.76463865]},{"series":{"dimension":{"Dim1":"Common Beech","Dim2":"Ant"}},"timestampList":["2020-08-02T00:00:00Z","2020-08-03T00:00:00Z","2020-08-04T00:00:00Z","2020-08-05T00:00:00Z","2020-08-06T00:00:00Z","2020-08-07T00:00:00Z","2020-08-08T00:00:00Z","2020-08-09T00:00:00Z","2020-08-10T00:00:00Z","2020-08-11T00:00:00Z","2020-08-12T00:00:00Z","2020-08-13T00:00:00Z","2020-08-14T00:00:00Z","2020-08-15T00:00:00Z","2020-08-16T00:00:00Z","2020-08-17T00:00:00Z","2020-08-18T00:00:00Z","2020-08-19T00:00:00Z","2020-08-20T00:00:00Z","2020-08-21T00:00:00Z","2020-08-22T00:00:00Z","2020-08-23T00:00:00Z","2020-08-24T00:00:00Z","2020-08-25T00:00:00Z","2020-08-26T00:00:00Z","2020-08-27T00:00:00Z"],"valueList":[304736,304158.8,287216.8,280256.4,284166.8,286101.2,277736,285676.2,294249.4,291576.8,314423.8,570310.8,573168.6,495914.2,583326,615020.6,554748,570703.2000000001,543870.2000000001,539038.4,518882.2,541077.6,591933.2000000001,585820.4,562762.6,584952.4],"isAnomalyList":[null,null,null,null,null,null,null,null,null,null,null,null,false,false,false,false,false,false,false,false,false,false,false,false,false,false],"periodList":[null,null,null,null,null,null,null,null,null,null,null,null,0,0,0,0,0,7,7,7,7,7,7,7,7,7],"expectedValueList":[null,null,null,null,null,null,null,null,null,null,null,null,541182.8383678028,572475.8210000457,583796.5424507495,581193.1257992042,577675.7631758249,543218.8698788144,545091.1807177522,548048.2558077894,541045.9283927807,563057.0977844606,582137.0696499643,570845.7721428118,573009.1436646357,575381.8253762884],"lowerBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,413026.865319631,443980.16331561294,455300.88476631674,452990.51119064726,449473.1485672679,417830.78935864446,418630.9521521584,421109.1310984852,414060.16212309134,436071.3315147713,455151.30338027497,443860.0058731224,446548.91509904194,449339.8969618353],"upperBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,669338.8114159745,700971.4786844786,712292.2001351824,709395.7404077612,705878.3777843819,668606.9503989844,671551.409283346,674987.3805170936,668031.6946624701,690042.86405415,709122.8359196538,697831.5384125011,699469.3722302296,701423.7537907416]}]}, [
  'Content-Length',
  '4559',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ca013b96-e8a2-475d-909f-48f18852e206',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  'ca013b96-e8a2-475d-909f-48f18852e206',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 23:57:43 GMT',
  'Connection',
  'close'
]);