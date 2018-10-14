/*
 * @author: Giao Ho
 * @email: loveme05ye@gmail.com
 */
public class MultipleLookupController {
    @AuraEnabled
    public static MultipleLookupInfo info(String finder) {
        Type finderType = Type.forName(finder);
        MultipleLookupFinder finder_c = (MultipleLookupFinder) finderType.newInstance();
        return finder_c.info();
    }
    
    @AuraEnabled
    public static List<MultipleLookupResponse> gets(String finder, List<ID> ids) {
        Type finderType = Type.forName(finder);
        MultipleLookupFinder finder_c = (MultipleLookupFinder) finderType.newInstance();
        if(ids == null) ids = new List<ID>();
        return finder_c.gets(ids);
    }
    
    @AuraEnabled
    public static Map<String, Object> find(String finder, String search_c, Decimal limit_c, List<ID> selectedIds, Map<String, Object> other) {
        Type finderType = Type.forName(finder);
        MultipleLookupFinder finder_c = (MultipleLookupFinder) finderType.newInstance();
        if(selectedIds == null) selectedIds = new List<ID>();
        List<MultipleLookupResponse> data = finder_c.find(search_c, limit_c.intValue(), selectedIds, other);
        Map<String, Object> result = new Map<String, Object>();
        result.put('search', search_c);
        result.put('data', data);
        return result;
    }
    
    public static List<MultipleLookupResponse> convertResponse(List<SObject> values) {
        List<MultipleLookupResponse> result = new List<MultipleLookupResponse>();
        for(SObject record : values) result.add(new MultipleLookupResponse(record));
        return result;
    }
    
    public static List<MultipleLookupResponse> convertResponse(List<SObject> values, String title) {
        List<MultipleLookupResponse> result = new List<MultipleLookupResponse>();
        for(SObject record : values) result.add(new MultipleLookupResponse(record, title));
        return result;
    }
    
    public static List<MultipleLookupResponse> convertResponse(List<SObject> values, String title, String find) {
        List<MultipleLookupResponse> result = new List<MultipleLookupResponse>();
        for(SObject record : values) result.add(new MultipleLookupResponse(record, title, find));
        return result;
    }
    
    public class MultipleLookupResponse {
        @AuraEnabled public ID id;
        @AuraEnabled public String title;
        @AuraEnabled public String find;
        @AuraEnabled public Object value;
        
        public MultipleLookupResponse() {}
        
        public MultipleLookupResponse(SObject value) {
            this(value, 'Name');
        }
        
        public MultipleLookupResponse(SObject value, String title) {
            this.value = value;
            this.id = value.Id;
            if(value.get(title) instanceof String)
                this.title = (String) value.get(title);
            else this.title = String.valueOf(value.get(title));
        }
        
        public MultipleLookupResponse(SObject value, String title, String find) {
            if(String.isBlank(title))
                this(value, 'Name');
            else this(value, title);
            if(value.get(find) instanceof String)
                this.find = (String) value.get(find);
            else this.find = String.valueOf(value.get(find));
        }
    }
    
    public class MultipleLookupInfo {
        @AuraEnabled public String objectName;
        @AuraEnabled public String objectAPI;
        @AuraEnabled public String findInField;
        
        public MultipleLookupInfo() {}
        
        public MultipleLookupInfo(String objectName, String objectAPI) {
            this.objectName = objectName;
            this.objectAPI = objectAPI;
        }
        
        public MultipleLookupInfo(String objectName, String objectAPI, String findInField) {
            this.objectName = objectName;
            this.objectAPI = objectAPI;
            this.findInField = findInField;
        }
    }
    
    public interface MultipleLookupFinder {
        MultipleLookupInfo info();
       	List<MultipleLookupResponse> gets(List<ID> ids);
        List<MultipleLookupResponse> find(String search_c, Integer limit_c, List<ID> selectedIds, Map<String, Object> other);
    }
}