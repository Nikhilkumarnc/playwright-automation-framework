export const usersData = {
    registrationUserDetails: {
        name: 'Nikhilkumar',
        emailId: 'nikhilkumar.temp@gmail.com',
        password: 'AutoTest@14',
        firstName: 'Nikhilkumar',
        lastName: 'N C',
        streetAddress: 'Vijayanagar',
        country: 'India',
        state: 'Karnataka',
        city: 'Bangalore',
        zipcode: '560040',
        mobile: '9933221100',
    },
    registeredUsersEmailIdAndPswd:
    {
        user1: 'Nikhilkumar',
        emailId1: 'nikhilkumar.temp@gmail.com',
        password: 'AutoTest@14'
    },
    parameterizeData: [
        { username: 'nikhilkumar.temp@gmail.com', password: '********', expected: 'error' },
        { username: 'nikhilkumar.temp@gmail.com', password: 'AutoTest@14', expected: 'success' },
        // { username: 'lockedUser@test.com', password: 'AutoTest@14', expected: 'locked' },
        // { username: '', password: '', expected: 'required' }
    ]
};