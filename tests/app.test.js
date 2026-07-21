const paymentStatus = require("../src/index");

test("payment service returns running status", () => {
    expect(paymentStatus()).toBe(
        "KijaniKiosk payment service running"
    );
});
