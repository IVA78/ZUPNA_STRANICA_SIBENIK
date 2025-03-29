package backend.service;

import backend.entity.TestMessage;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    public TestMessage getTestMessage() {
        return new TestMessage("Pozdrav sa backend-a!");
    }
}
