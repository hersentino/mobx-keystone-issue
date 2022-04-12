
enum MainModelItemStatus {
  UNKNOWN = 0,
  CREATED = 1,
  PRICING = 2,
  OK = 3,
  INTERNAL_ERROR = 4,
  OUT_OF_STOCK = 5,
  NOT_FOUND_MPN = 6,
  NOT_FOUND_SKU = 7,
  NOT_FOUND_SUPPLIER = 8,
  NO_AVAILABLE_PRICER = 9,
  IGNORED = 10,
  MISSING_INFORMATION = 11,
  OUT_OF_TIME = 12,
  UNRECOGNIZED = -1,
}

export default MainModelItemStatus;
