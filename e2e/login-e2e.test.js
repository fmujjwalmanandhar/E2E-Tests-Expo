describe("E2E Test", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("Assert Email and Password InputText Box is visible", async () => {
    //Assert that Email and Password Input Box is visible
    await expect(element(by.text("Please Enter Your Email"))).toBeVisible();
    await expect(element(by.label("password-label"))).toBeVisible();
  });

  it("Should show error message if credentials provided is incorrect", async () => {
    await element(by.id("email")).clearText();
    await element(by.id("email")).typeText("ujjwal@fusemachines.com");

    await expect(element(by.text("Password"))).toBeVisible();
    await element(by.id("password")).clearText();
    await element(by.id("password")).typeText("Test@123");

    await expect(element(by.text("Login"))).toBeVisible();
    await element(by.id("login-button")).tap();
  });

  it("Should type in Email and Password and login", async () => {
    //First of all clear the input box
    await element(by.id("email")).clearText();
    await element(by.id("password")).clearText();
    await element(by.id("email")).typeText("ujjwal.manandhar@fusemachines.com");
    await element(by.id("password")).typeText("Test@123");

    await element(by.id("login-button")).tap();
  });

  it('Should show "Welcome back" after sucessfull "Login"', async () => {
    await waitFor(element(by.text("Welcome back")))
      .toBeVisible()
      .withTimeout(3000);
  });

  it("Should scroll and validate 'Women's Clothing' is shown", async () => {
    await expect(element(by.label("Women's Clothing"))).not.toBeVisible();

    await expect(element(by.text("Men's Clothing"))).toBeVisible();
    await waitFor(element(by.label("women's clothing")))
      .toBeVisible()
      .whileElement(by.id("sectionList"))
      .scroll(600, "down");

    await expect(
      element(
        by.text("Rain Jacket Women Windbreaker Striped Climbing Raincoats")
      )
    ).not.toBeVisible();
    await element(by.id("sectionList")).scroll(1000, "down");
    await expect(
      element(
        by.text("Rain Jacket Women Windbreaker Striped Climbing Raincoats")
      )
    ).toBeVisible();
  });
});
