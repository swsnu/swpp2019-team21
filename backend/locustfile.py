from locust import HttpLocust, Locust, TaskSet, task

class LoadTask(TaskSet):
    def on_start(self):
        pass

    def on_stop(self):
        pass

    @task(1)
    def dashboard(self):
        self.client.get("/api/adpost/recent/")
        self.client.get("/api/adpost/hottest/")
        

class WebsiteUser(HttpLocust):
    task_set = LoadTask
    min_wait = 5
    max_wait = 1000