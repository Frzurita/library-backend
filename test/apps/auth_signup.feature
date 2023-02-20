Feature: SignUp
  In order to SignUp a new user, we will
  need to call the signUp endpoint with valid auth credentials.

  Scenario: The auth is correct
    Given I send a POST request to "/auth/signup" with body:
      """
      {
        "email": "signup@example.com",
        "password": "!!2233aA"
      }
      """
    Then the response status code should be 201
    Then the response has to include a key "accessToken"

  Scenario: The auth is send with wrong credentials
    Given I send a POST request to "/auth/signup" with body:
      """
      {
        "email": "signup2@example.com",
        "password": "!!2233a"
      }
      """
    Then the response status code should be 400

  Scenario: The auth is send with existing user
    Given I send a POST request to "/auth/signup" with body:
      """
      {
        "email": "signup@example.com",
        "password": "!!2233aA"
      }
      """
    Then the response status code should be 409