// Add helper functions here

import { randomUUID } from "crypto";

String.prototype.toSlug = function() {
    return this.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")+"-"+randomUUID().slice(0, 5);
}