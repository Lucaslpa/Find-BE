class BadRequest {
  missing(MissingItem : string ) {
    return {
      status: 400,
      error: `missing: ${MissingItem}`,
    };
  }

  invalid(InvalidItem: string) {
    return {
      status: 400,
      error: `invalid: ${InvalidItem}`,
    };
  }
}


export default BadRequest;
