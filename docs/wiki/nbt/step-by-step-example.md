---
title: 读取NBT示例
category: 基础
mentions:
    - ConsoleTerm
tags:
    - 专家
---

# 读取NBT示例

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

在进行本示例前，请先系统学习NBT的完整知识体系。参考*[深入理解NBT](/wiki/nbt/nbt-in-depth)*。
现在我们将分步骤演示如何读取NBT数据，示例数据的格式如下：
```json
"":{
    "myText":"我的NBT文本",
    "my Int32 Number":456,
}
```
当我们不知道后续数据类型时，需要读取下一个字节。

![](/assets/images/nbt/VS_Editor_images/step1.png)

我们读取到了数字10，表示即将读取复合标签。此时我们处于文件的根元素属性，需要读取根元素属性的名称。名称是字符串类型，因此首先需要读取字符串长度（以Int16形式存储）。

![](/assets/images/nbt/VS_Editor_images/step2.png)

根元素属性名称的长度为0，因此无需继续读取字节。此时需要读取下一个字节来确定后续数据类型。

![](/assets/images/nbt/VS_Editor_images/step3.png)

已知根复合标签中的下一个属性是字符串类型，但在读取属性值之前，需要先读取属性名称。因此需要再读取2个字节来获取属性名称的长度。

![](/assets/images/nbt/VS_Editor_images/step4.png)

属性名称长度为6字节，继续读取接下来的6个字节。

![](/assets/images/nbt/VS_Editor_images/step5.png)

通过UTF-8编码转换后，得到属性名称：`myText`。接下来重复字符串类型的读取流程，读取下一个Int16（2字节）来获取字符串值的长度。

![](/assets/images/nbt/VS_Editor_images/step6.png)

字符串长度为0x0B（十进制11），继续读取11个字节。

![](/assets/images/nbt/VS_Editor_images/step7.png)

经过UTF-8解码得到属性值：`My NBT text`。此时需要读取下一个字节来确定后续数据类型。

![](/assets/images/nbt/VS_Editor_images/step8.png)

读取到类型3（Int32类型），需要先读取属性名称的长度。读取接下来的2个字节。

![](/assets/images/nbt/VS_Editor_images/step9.png)

名称长度为0x0F（十进制15），继续读取15个字节并进行UTF-8解码。

![](/assets/images/nbt/VS_Editor_images/step10.png)

得到属性名称：`my Int32 Number`。接下来读取Int32类型的4个字节。

![](/assets/images/nbt/VS_Editor_images/step11.png)

读取到的Int32值为`0x01c8`（十进制456）。继续读取下一个字节确认后续数据类型。

![](/assets/images/nbt/VS_Editor_images/step12.png)

读取到0x00空字节，表示根复合标签结束。由于这是***根***复合标签，此时完成整个NBT文件的读取。

### NBT示例文件
本示例所使用的NBT文件：

<BButton
    link="/assets/nbt/nbt_example_file.nbt" download
    color=green
>下载NBT文件</BButton>

:::tip 重要注意事项
    - 文件可能包含NBT基岩版文件头，需注意这种情况。参见[深入理解NBT](/wiki/nbt/nbt-in-depth)>[NBT基岩版文件头](/wiki/nbt/nbt-in-depth#bedrock-nbt-file-header)
    - 结束空字节并不直接终止NBT读取，仅标记当前复合标签的结束
    - 所有数值均需按小端序读取，参见[深入理解NBT](/wiki/nbt/nbt-in-depth)>[小端序](/wiki/nbt/nbt-in-depth#little-endian)
    - NBT文件的首个根元素只能是复合标签或列表。根元素的名称虽然通常为空，但仍需读取并妥善处理
:::