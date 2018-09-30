export function handleJSONResponse(response) {
    var json = response.json();
    if (response.ok) {
        alert(200)
    } else {
        debugger;
        alert(json.message)
        return false;
    }
}