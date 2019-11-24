from .models import InterestedTags

initial_tags = ['여행', '컴퓨터', '공연', '연극', '휴대폰', '운동', '춤', '노래', '게임', '책', '영화', '동아리', '구인', '구직', '과외', '요가', '이벤트',
                '밴드']

for tag in initial_tags:
    if not InterestedTags.objects.filter(content=tag).exists():
        default_tag = InterestedTags(content=tag, usercount=0, postcount=0)
        default_tag.save()