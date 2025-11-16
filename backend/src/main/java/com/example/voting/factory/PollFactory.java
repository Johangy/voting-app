package com.example.voting.factory;

import com.example.voting.model.Option;
import com.example.voting.model.Poll;
import java.util.List;

public class PollFactory {
    public static Poll create(String title, List<String> optionTexts) {
        Poll poll = new Poll();
        poll.setTitle(title);
        optionTexts.forEach(text -> {
            Option opt = new Option();
            opt.setText(text);
            opt.setVotes(0);
            opt.setPoll(poll);
            poll.getOptions().add(opt);
        });
        return poll;
    }
}
