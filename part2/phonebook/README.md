# Phone book
## [x] 2.15: Phonebook step7
put new person is a variable
send to server
append locally

## [x] 2.16: Phonebook step8
Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.

## [x] 2.17: Phonebook step9
### [x] add the delete button
### [x] enable the delete button
### [x] make querry
### [x] update local 
### [x] add alert
### instructions

Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method:

2.17 window confirm feature screenshot
The associated resource for a person in the backend can be deleted by making an HTTP DELETE request to the resource's URL. If we are deleting eg a person who has the id 2, we would have to make an HTTP DELETE request to the URL localhost:3001/persons/2 . No data is sent with the request.

You can make an HTTP DELETE request with the axios library in the same way that we make all of the other requests.

NB: You can't use the name delete for a variable because it's a reserved word in JavaScript. Eg the following is not possible:

// use some other name for variable!
const delete = (id) => {
  // ...
}
## [x] 2.18*: Phonebook step10
### [ ] compare
### [ ] ask
### [ ] send update
### [ ] update locally
### instructions
Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the HTTP PUT method for updating the phone number.

If the person's information is already in the phonebook, the application can confirm the action from the user:



## [ ] alert message
### [x] duplicative delete
### [x] modify after delete
### [ ] short duration messages delete
### [ ] same size box ??
