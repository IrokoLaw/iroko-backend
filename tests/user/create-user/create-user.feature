Feature: Create User

  Scenario: I can create a user
    Given user data
      | firstName | lastName | email              | userId  |
      | John      | Doe      | john.doe@test.com  | user123 |
    When I send a request to create the user
    Then I receive the user ID
    And I can see my user in a list of all users

  Scenario Outline: I try to create a user with invalid data
    Given user data
      | firstName  | lastName | email                | userId  |
      | <FirstName> | <LastName> | <Email>           | <UserId>|
    When I send a request to create the user
    Then I receive an error "Bad Request" with status code 400

    Examples:
      | FirstName | LastName | Email                | UserId  |
      |           | Doe      | unique1@test.com     | user001 |
      | John      |          | unique2@test.com     | user002 |
      | John      | Doe      |                      | user003 |
      | John      | Doe      | unique4@test.com     |         |
      | Jane      | Smith    | invalid-email-format | user004 |

  Scenario Outline: I try to create a duplicate user
    Given user data
        | firstName | lastName | email             | userId    |
        | <FirstName> | <LastName> | <Email>       | <UserId>  |
    When I send a request to create the user
    Then I receive the user ID
    When I send a request to create the user
    Then I receive an error "Conflict" with status code 409
    Examples: Active Duplicate Case
        | FirstName | LastName | Email             | UserId    |
        | Alex      | Brown    | unique6@test.com  | duplicate |
