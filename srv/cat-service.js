module.exports = async function () {
    this.before('CREATE', 'Files', req => {
        console.log('Create called');
        console.log(JSON.stringify(req.data));
    
        // const baseUrl = determineBaseUrl(req);
        req.data.url = `/odata/v4/catalog/Files(${req.data.ID})/content`;
    });
    
    this.before('READ', 'Files', req => {
        console.log('content-type: ', req.headers['content-type']);
    });
    
    this.after('READ', 'Files', (each) => {
        if (each) {
            each.headers = each.headers || {};
            each.headers['Access-Control-Allow-Origin'] = '*'; // Allow all origins
        }
    });
    
    this.on('CREATE', 'Files', (req, next) => {
        req.headers = req.headers || {};
        req.headers['Access-Control-Allow-Origin'] = '*'; // Allow all origins
        return next();
    });
    }