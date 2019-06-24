module.exports = {
    'Take Home Exam Test' : function (client) {
        client
        .url('http://localhost/8000/projects?page=1')
        .waitForElementVisible('.pageList', 100000)
        .expect.url().to.contain('page=')
        .assert.attributeContains('a', 'href', '/projects/5373')
        .waitForElementVisible('th', 100000)
        .end();
    }
};