Feature: Get Book
  In order to get a book
  As a user
  I want to get a book from it's id.

  Scenario: Create a book
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "adaafeb6-391f-4db4-a9f9-1faea5ae9372",
        "name": "Alice in the wonderlands"
      }
      """
    Then the response status code should be 201

  Scenario: Get an existing book
    Given I send a GET request to "/book/adaafeb6-391f-4db4-a9f9-1faea5ae9372"
    Then the response status code should be 200
    And the response should be an object with body:
      """
      {
        "id": "adaafeb6-391f-4db4-a9f9-1faea5ae9372",
        "name": "Alice in the wonderlands"
      }
      """

  Scenario: Get a not existing book
    Given I send a GET request to "/book/bdaafeb6-391f-4db4-a9f9-1faea5ae9372"
    Then the response status code should be 200
    And the response should be empty