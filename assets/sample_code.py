# MODELCHIMP: import and instantiate modelchimp tracker
from modelchimp import Tracker
tracker = Tracker('<PROJECT KEY>', 'demo.modelchimp.com')

from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble.forest import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Load and split the data
breast_cancer = load_breast_cancer()
x_train, x_test, y_train, y_test = train_test_split(
    breast_cancer.data,
    breast_cancer.target,
    stratify=breast_cancer.target,
    random_state=49)

# Train and predict
random_forest_model = RandomForestClassifier(n_estimators=101).fit(x_train, y_train)
y_pred = random_forest_model.predict(x_test)

# Get the evaluation metric
evl = {}
evl['accuracy'] = accuracy_score(y_test, y_pred)
evl['precision'] = precision_score(y_test, y_pred)
evl['recall'] = recall_score(y_test, y_pred)

# MODELCHIMP: Log the metric
tracker.add_multiple_metrics(evl)

print("Accuracy: %s" % evl['accuracy'])
print("Precision: %s" % evl['precision'])
print("Recall: %s" % evl['recall'])
