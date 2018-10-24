/**
 * @author giao.ho
 * @email: loveme05ye@gmail.com
 */
public class InputLookupController {
    @AuraEnabled
    public static InputLookupInfo info(String finder) {
        Type finderType = Type.forName(finder);
        InputLookupFinder finder_c = (InputLookupFinder) finderType.newInstance();
        return finder_c.info();
    }
    
    @AuraEnabled
    public static InputLookupResponse get(String finder, ID id) {
        Type finderType = Type.forName(finder);
        InputLookupFinder finder_c = (InputLookupFinder) finderType.newInstance();
        return finder_c.get(id);
    }
    
    @AuraEnabled
    public static Map<String, Object> find(String finder, String search_c, Decimal limit_c, Map<String, Object> other) {
        Type finderType = Type.forName(finder);
        InputLookupFinder finder_c = (InputLookupFinder) finderType.newInstance();
        List<InputLookupResponse> data = finder_c.find(search_c, limit_c.intValue(), other);
        Map<String, Object> result = new Map<String, Object>();
        result.put('search', search_c);
        result.put('data', data);
        return result;
    }
    
    /*
     * Search of popup
     * options : {offset, lastId, lastSort, sortBy, sortDirection, other}
     * 
     * @author giao.ho
     */
    @AuraEnabled
    public static List<Object> search(String finder, String search_c, Decimal limit_c, Map<String, Object> options) {
        Type finderType = Type.forName(finder);
        String lastId, sortBy, sortDirection;
        Decimal offset = 0;
        Object lastSort = null;
        Map<Object, Object> other = null;
        InputLookupFinder finder_c = (InputLookupFinder) finderType.newInstance();
        if(options.containsKey('offset')) offset = (Decimal) options.get('offset');
        if(offset > 0 && options.containsKey('lastId')) lastId = (String) options.get('lastId');
        if(options.containsKey('other')) other = (Map<Object, Object>) options.get('other');
        if(options.containsKey('sortBy') && options.containsKey('sortDirection')) {
            sortBy = (String) options.get('sortBy');
            sortDirection = (String) options.get('sortDirection');
            if(String.isNotBlank(sortDirection)) sortDirection = sortDirection.toLowerCase();
            if(offset > 0 && options.containsKey('lastSort'))
                lastSort = options.get('lastSort');
            if(String.isNotBlank(sortBy) && String.isNotBlank(sortDirection))
                return finder_c.search(search_c, offset.intValue(), lastId, limit_c.intValue(), lastSort, sortBy, sortDirection, other);
        }
        return finder_c.search(search_c, offset.intValue(), lastId, limit_c.intValue(), other);
    }
    
    public static InputLookupResponse convert(SObject record, String field) {
        return new InputLookupResponse(record, 'Name', field);
    }
    
    public static List<InputLookupResponse> converts(List<SObject> records, String field) {
        List<InputLookupResponse> result = new List<InputLookupResponse>();
        for(SObject record : records) result.add(new InputLookupResponse(record, 'Name', field));
        return result;
    }
    
    public class InputLookupResponse {
        @AuraEnabled public ID id;
        @AuraEnabled public String title;
        @AuraEnabled public String find;
        @AuraEnabled public Object value;
        
        public InputLookupResponse() {}
        
        public InputLookupResponse(SObject value) {
            this(value, 'Name');
        }
        
        public InputLookupResponse(SObject value, String title) {
            this.value = value;
            this.id = value.Id;
            if(value.get(title) instanceof String)
                this.title = (String) value.get(title);
            else this.title = String.valueOf(value.get(title));
        }
        
        public InputLookupResponse(SObject value, String title, String find) {
            if(String.isBlank(title))
                this(value, 'Name');
            else this(value, title);
            if(String.isNotBlank(find)) {
                if(value.get(find) instanceof String)
                    this.find = (String) value.get(find);
                else this.find = String.valueOf(value.get(find));
            }
        }
    }
    
    public class FieldInfo {
        @AuraEnabled public String label;
        @AuraEnabled public String fieldName;
        /* Options of type
         * [action, button, currency, date, email, location, number, percent, phone, text, url]
         */
        @AuraEnabled public String type;
        @AuraEnabled public Integer initialWidth;
        @AuraEnabled public Object typeAttributes;
        @AuraEnabled public Object cellAttributes;
        @AuraEnabled public Boolean sortable = false;
        @AuraEnabled public Object actions;
        @AuraEnabled public String iconName;
        
        public FieldInfo(String label, String fieldName, String type) {
            this.label = label;
            this.fieldName = fieldName;
            this.type = type;
        }
        
        public FieldInfo(String label, String fieldName, String type, Boolean sortable) {
            this.label = label;
            this.fieldName = fieldName;
            this.type = type;
            this.sortable = sortable;
        }
    }
    
    public class ShowField {
        @AuraEnabled public String primaryField;
        @AuraEnabled public String secondaryField;
        
        public ShowField(String primaryField, String secondaryField) {
            this.primaryField = primaryField;
            this.secondaryField = secondaryField;
        }
    }
    
    public class InputLookupInfo {
        @AuraEnabled public String objectName;
        @AuraEnabled public String objectAPI;
        @AuraEnabled public String findInField;
        @AuraEnabled public List<FieldInfo> fieldsInfo;
        @AuraEnabled public ShowField showFields;
        
        public InputLookupInfo() {}
        
        public InputLookupInfo(String objectName, String objectAPI) {
            this.objectName = objectName;
            this.objectAPI = objectAPI;
        }
        
        public InputLookupInfo(String objectName, String objectAPI, String findInField) {
            this.objectName = objectName;
            this.objectAPI = objectAPI;
            this.findInField = findInField;
        }
    }
    
    public interface InputLookupFinder {
        InputLookupInfo info();
        InputLookupResponse get(ID id);
        List<InputLookupResponse> find(String search_c, Integer limit_c, Map<String, Object> other);
        List<Object> search(String search_c, Integer offset, String lastId, Integer limit_c, Map<Object, Object> other);
        List<Object> search(String search_c, Integer offset, String lastId, Integer limit_c, Object lastSort, String sortBy, String sortDirection, Map<Object, Object> other);
    }
}