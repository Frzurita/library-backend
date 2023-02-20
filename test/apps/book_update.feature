Feature: Update Book
  In order to update a book
  As a user
  I want to update book properties following the constraints of the book aggregate.

  Scenario: Create a book
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "4467a2af-d0f0-4b55-938a-653d7f77eb48",
        "name": "Tao"
      }
      """
    Then the response status code should be 201

  Scenario: The book name is being changed
    Given I send a PUT request to "/book" with body:
      """
      {
        "id": "4467a2af-d0f0-4b55-938a-653d7f77eb48",
        "name": "Live of Pi"
      }
      """
    Then the response status code should be 200
    And the response should be empty

  Scenario: The book name is being changed with a wrong value
    Given I send a PUT request to "/book" with body:
      """
      {
        "id": "4467a2af-d0f0-4b55-938a-653d7f77eb48",
        "name": ""
      }
      """
    Then the response status code should be 400