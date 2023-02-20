Feature: SignIn
  In order to SignIn, we will
  need to call the signin endpoint with valid auth credentials.

  Scenario: Create a new user
    Given I send a POST request to "/auth/signup" with body:
      """
      {
        "email": "signin@example.com",
        "password": "!!2233aA"
      }
      """
    Then the response status code should be 201
    Then the response has to include a key "accessToken"

  Scenario: The auth is correct
    Given I send a POST request to "/auth/signin" with body:
      """
      {
        "email": "signin@example.com",
        "password": "!!2233aA"
      }
      """
    Then the response status code should be 201
    Then the response has to include a key "accessToken"

  Scenario: The auth is send with wrong credentials format
    Given I send a POST request to "/auth/signin" with body:
      """
      {
        "email": "signin@example.com",
        "password": "!!2233a"
      }
      """
    Then the response status code should be 400

  Scenario: The auth is send with wrong password
    Given I send a POST request to "/auth/signin" with body:
      """
      {
        "email": "signin@example.com",
        "password": "!!2233aB"
      }
      """
    Then the response status code should be 400

  Scenario: The auth is send with wrong email
    Given I send a POST request to "/auth/signin" with body:
      """
      {
        "email": "signin-test@example.com",
        "password": "!!2233aA"
      }
      """
    Then the response status code should be 400