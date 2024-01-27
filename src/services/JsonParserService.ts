// Not needed because of the Models static methods to init from Objects

export default class JsonParserService {
  // Takes a json object and keys to transform from strings to Dates

  // TODO: test performance
  public static transformDates(items: Array<any>, dateKeys: Array<string>) {
    return items.map((item) => {
      Object.keys(item).forEach((key) => {
        if (dateKeys.includes(key)) {
          item[key] = this.stringToDate(item[key])
        }
      })

      return item
    })
  }

  private static stringToDate(value: string): Date {
    return new Date(value)
  }
}
