/*
 * Copyright (c) 2003-2021 The Apereo Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *             http://opensource.org/licenses/ecl2
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.sakaiproject.conversations.api.repository;

import java.util.List;
import java.util.Optional;

import org.sakaiproject.conversations.api.Reaction;
import org.sakaiproject.conversations.api.model.TopicReactionTotal;
import org.sakaiproject.springframework.data.SpringCrudRepository;

public interface TopicReactionTotalRepository extends SpringCrudRepository<TopicReactionTotal, Long> {

    List<TopicReactionTotal> findByTopicId(String topicId);
    Optional<TopicReactionTotal> findByTopicIdAndReaction(String topicId, Reaction reaction);
    Integer deleteByTopicId(String topicId);
}
