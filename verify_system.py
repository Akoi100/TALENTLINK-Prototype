import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

with open('js/app.js', encoding='utf-8') as f:
    js = f.read()

with open('js/data.js', encoding='utf-8') as f:
    data_js = f.read()

html_ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))
js_get_ids = set(re.findall(r'getElementById\(["\']([^"\']+)["\']\)', js))

missing = js_get_ids - html_ids
print(f"Total HTML IDs: {len(html_ids)}")
print(f"Queried getElementById IDs: {len(js_get_ids)}")
print(f"Missing IDs: {missing}")

# Check data categories
print("Data JS contains categories:")
for cat in ["indoorSports", "outdoorSports", "musicAndDrama"]:
    print(f" - {cat} in data.js: {cat in data_js}")

# Check required activities
activities = [
    "Table Tennis", "Badminton", "Lawn Tennis", "Chess", "Basketball",
    "Football", "Rugby", "Volleyball", "Hockey", "Athletics", "Handball",
    "Choral", "Drama"
]
for act in activities:
    print(f" - Activity '{act}': {act in data_js or act in html}")
