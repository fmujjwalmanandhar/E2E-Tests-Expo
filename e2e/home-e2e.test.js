describe("Home screen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("Should show Email and Password Input Text Box", async () => {
    //Assert that Email and Password Input Box is visible
    await expect(element(by.text("Please Enter Your Email"))).toBeVisible();
    await expect(element(by.text("Please Enter Your Password"))).toBeVisible();
  });

  it("Should type in Email and Password and login", async () => {
    //First of all clear the input box
    await element(by.id("email")).clearText();
    await element(by.id("email")).typeText("ujjwal.manandhar@fusemachines.com");

    await expect(element(by.text("Password"))).toBeVisible();
    await element(by.id("password")).clearText();
    await element(by.id("password")).typeText("Test@123");

    await expect(element(by.text("Login"))).toBeVisible();
    await element(by.id("login-button")).tap();
  });

  it('shows "Welcome" after sucessfull "Login"', async () => {
    await expect(element(by.text("Welcome!"))).toBeVisible();
  });
});
