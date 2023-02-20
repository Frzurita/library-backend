Feature: Delete Book
  In order to delete a book
  As a user
  I want to delete a book from it's id.

  Scenario: Create a book
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "17e9d27f-e1fb-4b17-80a2-9769b50dba65",
        "name": "The lord of the rings"
      }
      """
    Then the response status code should be 201

  Scenario: Delete an existing book
    Given I send a DELETE request to "/book/17e9d27f-e1fb-4b17-80a2-9769b50dba65"
    Then the response status code should be 200
    And the response should be empty