const {sqlForPartialUpdate} = require("./sql");


describe("sqlForPartialUpdate", function(){
    test("update 1 item", function (){
        const result = sqlForPartialUpdate(
            {firstName: 'John'},
            { firstName: 'first_name'});
        expect(result).toEqual({
            setCols: '"first_name"=$1',
            values: ['John'],
        });
    });

    test("works: 2 items", function(){
        const result = sqlForPartialUpdate(
            {firstName: 'John', lastName: 'Doe'},
            { firstName: 'first_name', lastName: 'last_name' });
        expect(result).toEqual({
            setCols: '"first_name"=$1, "last_name"=$2',
            values: ['John', 'Doe'],
        });
    });
});