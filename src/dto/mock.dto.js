export default class MockDTO {
  constructor(mock) {
    (this.name = mock.name),
      (this.lastname = mock.lastname),
      (this.active = true),
      (this.phone = mock.phone ? mock.phone.split("-").join("") : "");
  }
}
