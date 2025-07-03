# What is this? #

This repo is a high-level [Playwright](https://playwright.dev) port of a [JavaScript/Selenium/Webdriver.io test suite](https://github.com/resnickmicah/nutrien_test_m_resnick) I worked on as part of a take home assignment from a previous job application. If you would like to see some Java/Selenium code I wrote for another job application, see [this other repo](https://github.com/resnickmicah/Costco-Selenium-Test/blob/master/src/test/java/com/lazerycode/selenium/tests/CostcoExample.java).

# How do I run the tests? #

Have [node.js version 20 LTS](https://nodejs.org/en/about/previous-releases) installed.
From the repository root:
```
npm install
npx playwright test
```

After running the test suite, if you want to see an HTML report with the test results:
```
npx playwright show-report
```

By default, playwright runs with headless browsers. If you want to see the browsers as they're running the tests:
```
npx playwright test --headed
```

For more information, check out Playwright's [Getting Started guide](https://playwright.dev/docs/intro#running-the-example-test)
