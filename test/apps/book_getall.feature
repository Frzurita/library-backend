Feature: Get all Book
  In ordet to get all books
  As a user
  I want to get all books.

  Scenario: Create a book
    Given I send a POST request to "/book" with body:
      """
      {
        "id": "5426a74c-32ea-42f2-aec6-df52ecd4fdb6",
        "name": "KPI's best practices"
      }
      """
    Then the response status code should be 201

  Scenario: Get all existing books
    Given I send a GET request to "/book"
    Then the response status code should be 200
    And the response should be an array with this id:
      """
      5426a74c-32ea-42f2-aec6-df52ecd4fdb6
      """