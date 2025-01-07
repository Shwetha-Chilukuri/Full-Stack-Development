const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2020,
  getDetails: function () {
    return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`;
  }
};

const electricCar = Object.create(car);

electricCar.batteryCapacity = "100 kWh";

electricCar.getBatteryInfo = function () {
  return `Battery Capacity: ${this.batteryCapacity}`;
};

console.log(electricCar.getDetails());
console.log(electricCar.getBatteryInfo());
