Feature: Create Book
  In order to create get new books, we will
  need to create them.

  Scenario: The book is correct
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "bb94cc1b-858c-43e5-a62c-60adafda34d6",
        "name": "Dorian Gray"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: The book id is wrong
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "wrong-uuid",
        "name": "Don Quijote"
      }
      """
    Then the response status code should be 400

  Scenario: The book name is empty
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "bb94cc1b-858c-43e5-a62c-60adafda34d6",
        "name": ""
      }
      """
    Then the response status code should be 400