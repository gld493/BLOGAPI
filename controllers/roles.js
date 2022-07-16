const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("post")
 .updateOwn("post")
 
ac.grant("admin")
 .extend("basic")
 .updateAny("post")
 .deleteAny("post")
 
return ac;
})();