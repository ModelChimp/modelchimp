from django.db import connection

# Function for getting database connection and then doing query execution
def execute_query(query_name, group_concat_max_len=None):
    with connection.cursor() as cursor:
        if group_concat_max_len:
            cursor.execute('SET SESSION group_concat_max_len = %d' % group_concat_max_len)
            cursor.execute("SET TIME ZONE 'UTC'")
        cursor.execute(query_name)
        description = cursor.description
        rows = cursor.fetchall()
        result = [dict(zip([column[0] for column in description], row)) for row in rows]
        
    return result


# Function for getting database connection and then performing non select based statements
def execute_statement(query_name, group_concat_max_len=None):
    with connection.cursor() as cursor:
        if group_concat_max_len:
            cursor.execute('SET SESSION group_concat_max_len = %d' % group_concat_max_len)
            cursor.execute("SET TIME ZONE 'UTC'")
        cursor.execute(query_name)


# Convert dict to a key value list
def dict_to_kv(dict_val):
    result = [{'key': k, 'value': v} for k, v in dict_val.items()]
    result.sort(key=lambda e: e['key'])

    return result


# Convert string dict to native form
def dict2native(dict_val):
    result = {}

    if not isinstance(dict_val, dict):
        return dict_val

    for k, v in dict_val.items():
        result[k] = v
        if v == 'True': result[k] = True; continue
        if v == 'False': result[k] = False; continue
        if v == 'None': result[k] = None; continue
        if isinstance(v, bool): continue

        try:
            result[k] = int(v)
            continue
        except Exception:
            pass

        try:
            result[k] = float(v)
            continue
        except Exception:
            pass

    return result
