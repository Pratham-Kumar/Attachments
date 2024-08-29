using sm.vendorfeedbackcontract as my from '../db/schema';

service CatalogService {
entity Files as projection on my.Files;
}
