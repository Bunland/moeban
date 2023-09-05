#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <jansson.h>

// Frees a dynamically allocated string.
void freeString(char *str)
{
    free(str);
}

// Checks if a database file exists.
bool validateDb(const char *db_name)
{
    FILE *file = fopen(db_name, "r");
    if (file != NULL)
    {
        fclose(file);
        return true;
    }
    return false;
}

// Creates a new database if it doesn't already exist.
bool createDb(const char *db_name)
{
    if (!validateDb(db_name))
    {
        FILE *file = fopen(db_name, "w");
        if (file == NULL)
        {
            return false;
        }
        fprintf(file, "{}");
        fclose(file);
        return true;
    }
    return false;
}

// Writes a new object to a specified collection in the database.
bool write(const char *db_name, const char *collection, const char *new_object)
{
    json_t *root;
    json_error_t error;
    root = json_load_file(db_name, 0, &error);

    if (root == NULL)
    {
        return false;
    }

    // Check if the collection exists in the database.
    json_t *collection_obj = json_object_get(root, collection);

    if (collection_obj == NULL)
    {
        // If the collection does not exist, create it.
        collection_obj = json_array();
        json_object_set_new(root, collection, collection_obj);
    }

    // Create a JSON object from the provided string.
    json_t *new_json = json_loads(new_object, 0, &error);
    if (new_json == NULL)
    {
        printf("Error parsing the file\n");
        json_decref(root);
        return false;
    }

    // Add the new object to the corresponding collection.
    json_array_append(collection_obj, new_json);

    // Save changes to the JSON file.
    if (json_dump_file(root, db_name, JSON_INDENT(2)) != 0)
    {
        json_decref(new_json);
        json_decref(root);
        return false;
    }

    // Free memory.
    json_decref(new_json);
    json_decref(root);
    return true;
}

// Finds and returns all objects in a specified collection in the database.
char *find(const char *db_name, const char *collection)
{
    json_t *root;
    json_t *arr;
    json_error_t error;

    root = json_load_file(db_name, 0, &error);
    if (!root || !json_is_object(root))
    {
        return NULL;
    }

    arr = json_object_get(root, collection);
    if (!json_is_array(arr))
    {
        json_decref(root);
        return NULL;
    }

    // Convert the JSON array to a formatted string.
    char *objectsJSON = json_dumps(arr, JSON_INDENT(2));
    char *result = strdup(objectsJSON);
    free(objectsJSON);
    json_decref(arr);
    json_decref(root);
    return result;
}

// Finds and returns the first object in a specified collection that matches the given key and value.
char *findOne(const char *db_name, const char *collection, const char *key, const char *value)
{
    json_t *root;
    json_t *arr;
    json_error_t error;

    root = json_load_file(db_name, 0, &error);

    if (!root || !json_is_object(root))
    {
        return NULL;
    }

    arr = json_object_get(root, collection);
    if (!json_is_array(arr))
    {
        json_decref(root);
        return NULL;
    }

    size_t size = json_array_size(arr);
    for (size_t i = 0; i < size; i++)
    {
        json_t *obj = json_array_get(arr, i);
        if (json_is_object(obj))
        {
            json_t *propValue = json_object_get(obj, key);
            if (propValue)
            {
                if (json_typeof(propValue) == JSON_INTEGER)
                {
                    int propValueInt = json_integer_value(propValue);
                    if (propValueInt == atoi(value))
                    {
                        // Create a copy of the matching object and convert it to a formatted string.
                        json_t *dumpedObj = json_deep_copy(obj);
                        char *objJSON = json_dumps(dumpedObj, JSON_INDENT(2));
                        char *result = strdup(objJSON);
                        free(objJSON);
                        json_decref(dumpedObj);
                        json_decref(obj);
                        json_decref(root);
                        return result;
                    }
                }
                // Continue checking for other data types like JSON_STRING if needed.
            }
        }
    }
    json_decref(root);
    return NULL;
}

// Removes the first object in a specified collection that matches the given key and value.
bool removeOne(const char *db_name, const char *arrayName, const char *key, const char *value)
{
    json_t *root;
    json_t *arr;
    json_error_t error;

    root = json_load_file(db_name, 0, &error);

    if (!root || !json_is_object(root))
    {
        return false;
    }

    arr = json_object_get(root, arrayName);
    if (!json_is_array(arr))
    {
        json_decref(root);
        return false;
    }

    size_t size = json_array_size(arr);
    size_t indexToRemove = size;
    for (size_t i = 0; i < size; i++)
    {
        json_t *obj = json_array_get(arr, i);
        if (json_is_object(obj))
        {
            json_t *propValue = json_object_get(obj, key);
            if (propValue)
            {
                if (json_is_integer(propValue))
                {
                    int propValueInt = json_integer_value(propValue);
                    if (propValueInt == atoi(value))
                    {
                        indexToRemove = i;
                        break;
                    }
                }
                // Continue checking for other data types like JSON_STRING if needed.
            }
        }
    }

    if (indexToRemove != size)
    {
        // Remove the matching object from the array, and update the database file.
        json_t *removedObj = json_array_get(arr, indexToRemove);
        json_array_remove(arr, indexToRemove);
        json_decref(removedObj);
        json_dump_file(root, db_name, JSON_INDENT(2));
        json_decref(arr);
        json_decref(root);
        return true;
    }

    json_decref(arr);
    json_decref(root);
    return false;
}

int main()
{
    return 0;
}
