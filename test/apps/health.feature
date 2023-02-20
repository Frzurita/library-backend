Feature: Check if the service is alive
  In order to check if the service is alive a
  Health endpoint is going to be used.

  Scenario: The service is up
    Given I send a GET request to "/health"

    Then the response status code should be 200
    And the response should be empty